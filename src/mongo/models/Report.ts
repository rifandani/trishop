import { Schema, model, models, Model } from 'mongoose'
// files
import { IReport } from 'types/Report'

const reportSchema = new Schema<IReport>({
  reviewRef: {
    type: Schema.Types.ObjectId,
    ref: 'Review',
    required: [true, 'reviewRef must not be empty'],
  },
  reporter: {
    type: String,
    required: [true, 'reporter must not be empty'],
    trim: true,
  },
  argument: {
    type: String,
    required: [true, 'argument must not be empty'],
    minLength: 5,
    maxLength: 50,
    trim: true,
  },
  typeId: {
    type: Number,
    required: [true, 'typeId must not be empty'],
    min: 1,
  },
  createdAt: {
    type: Date,
    default: (): Date => new Date(),
  },
})

const ReportModel = models.Report || model<IReport>('Report', reportSchema)

export default ReportModel as Model<
  IReport,
  Record<string, unknown>,
  Record<string, unknown>
>
