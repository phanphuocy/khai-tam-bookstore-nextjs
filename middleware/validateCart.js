let yup = require("yup");

async function validateCart(req, res, next) {
  let { items, delivery, payment } = req.body;

  if (!items || !delivery) {
    return res.status(400).json({
      msg: "Please include cart items and delivery info",
    });
  }

  let itemsSchema = yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        slug: yup.string().required(),
        quanlity: yup.number().required().positive().integer().min(1),
      })
    );

  let isItemsValid = await itemsSchema.isValid(items);

  if (!isItemsValid) {
    return res.status(400).json({
      msg: "Invalid items cart",
    });
  }

  let deliverySchema = yup.object().shape({
    name: yup.string().required(),
    fullAddress: yup.string().required(),
    phone: yup.string().required(),
    title: yup.string().required().oneOf(["Anh", "Chị"]),
    email: yup.string().email(),
  });

  let isDeliveryValid = await deliverySchema.isValid(delivery);

  if (!isDeliveryValid) {
    return res.status(400).json({
      msg: "Invalid delivery info",
    });
  }

  let paymentSchema = yup.object().shape({
    paymentMethod: yup.string().required().oneOf(["cod", "online"]),
  });

  let isPaymentValid = await paymentSchema.isValid(payment);

  if (!isPaymentValid) {
    return res.status(400).json({
      msg: "Invalid payment info",
    });
  }

  return next();
}

export default validateCart;
