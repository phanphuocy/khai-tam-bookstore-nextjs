import nextConnect from "next-connect";
import auth from "../../../middleware/auth";
import connectMongoose from "../../../database/initMongoose";
import User from "../../../database/userModel";
import * as yup from "yup";

const handler = nextConnect();

handler.use(auth);

handler.post(async (req, res) => {
  try {
    await connectMongoose();

    let bookToAdd = req.body;

    let schema = yup.object().shape({
      title: yup.string().required(),
      slug: yup.string().required(),
      cover: yup.string().required(),
      author: yup.string().required(),
      subcategory: yup.object().shape({
        name: yup.string().required(),
        slug: yup.string().required(),
      }),
      category: yup.object().shape({
        name: yup.string().required(),
        slug: yup.string().required(),
      }),
    });

    let isReqValid = await schema.isValid(bookToAdd);

    if (!isReqValid) {
      return res.status(400).json({
        msg: "Thông tin không đúng",
      });
    }

    let user = req.user;
    if (user.wishlist.map((book) => book.slug).indexOf(bookToAdd.slug) === -1) {
      user = await User.findOneAndUpdate(
        {
          email: user.email,
        },
        { $push: { wishlist: bookToAdd } },
        { new: true }
      ).exec();
      console.log("Added one book to", user.name, "wishlist");
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Server Internal Error",
    });
  }
});

export default handler;
