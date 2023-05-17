import { model } from 'mongoose'
import GlobalReportSchema from '../schema/globalReport.schema.js'

const GlobalReport = model('GlobalReport', GlobalReportSchema)

export default GlobalReport
