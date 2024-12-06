import mogoose from "mongoose"

const todoSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  complete: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: Mongoose.Schema.Types.ObjectId,      // this is used reference and name given in model should be used for reference
    ref : "User"
  },
  {
    subTodos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubTodo"
      }
    ]
  }
},{timestamps:true})

export const Todo = mongoose.model("Todo",todoSchema);