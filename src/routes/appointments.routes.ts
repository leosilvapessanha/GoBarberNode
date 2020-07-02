import {Router, response} from 'express'
import { startOfHour, parseISO, isEqual } from 'date-fns'
import Appointments from "../model/appointments"
const appointmentsRouter = Router()

const appointments: Appointments[] =[]

appointmentsRouter.post('/', (request,response)=>{
  const {provider, date} = request.body

  const parseOfDate = startOfHour(parseISO(date))

  const findAppointmenteInTheSameDay = appointments.find(appointment =>
      isEqual(parseOfDate, appointment.date)
    )

  if(findAppointmenteInTheSameDay){
    return response.status(400).json({message: "already booked"})
  }



  const appointment = new Appointments (provider, parseOfDate)

  appointments.push(appointment)

  return response.json( appointment )
}

)


export default appointmentsRouter
