import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  number: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 11,
    validate: {
      validator: function (v: string) {
        return /^\d{2,3}\-(\d+)$/.test(v);
      },
      message: () => "Wrong format. Please enter in the following order: 123-1234567",
    },
  },
  belongsTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

contactSchema.set("toJSON", {
  transform: (doc, ret) => {
    // **Different from tutorial**
    // Cast the 'ret' object to 'any' to bypass TypeScript's strictness
    const sanitizedRet = ret as any;
    sanitizedRet.id = ret._id.toString();
    delete sanitizedRet._id;
    delete sanitizedRet.__v;

    return sanitizedRet;
  }
});

export default mongoose.model("Contact", contactSchema);