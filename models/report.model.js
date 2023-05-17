import { model } from 'mongoose'
import ReportSchema from '../schema/report.schema.js'

const Report = model('Report', ReportSchema)

export default Report
