import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema(
  {
    cartItems: [
      {
        bookImage: {
          type: String,
          required: true,
        },
        bookName: {
          type: String,
          required: true,
        },
        bookId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Book' },
        qty: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

CartSchema.pre('save', function (next) {
  if (this.isNew) {
    this.orderItems = [];
    this.totalPrice = 0;
  }
  next();
});

const CartModel = mongoose.model('Cart', CartSchema);
export default CartModel;
