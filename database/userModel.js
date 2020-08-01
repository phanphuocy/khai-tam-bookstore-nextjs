const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên."],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng nhập email."],
    unique: true,
    match: [
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      "Email vừa rồi không hợp lệ, vui lòng nhập lại.",
    ],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu."],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  wishlist: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      cover: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      category: {
        slug: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
      subcategory: {
        slug: {
          type: String,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    },
  ],
  orders: [
    {
      delivery: {
        emai: String,
        name: String,
        phone: String,
        title: String,
      },
      payment: {
        paymentMethod: String,
      },
      items: [
        {
          slug: String,
          title: String,
          author: String,
        },
      ],
      prices: {
        discountedPrice: Number,
      },
      status: String,
      dateOrdered: Date,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before save
UserSchema.pre("save", async function beforeSave(next) {
  console.log(this);
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match user entered password vs. hashed password in DB
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

global.User = global.User || mongoose.model("User", UserSchema);
module.exports = global.User;
