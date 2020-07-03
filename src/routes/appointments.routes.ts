import { Router, response, request } from 'express'
import { startOfHour, parseISO, isEqual } from 'date-fns'
import AppointmentsRepository from "../repositories/appointmentsRepository"
import Appointments from '../model/appointments'

const appointmentsRouter = Router()

const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body

  const parseOfDate = startOfHour(parseISO(date))

  const findAppointmenteInTheSameDay = appointmentsRepository.findByDate(parseOfDate)

  if (findAppointmenteInTheSameDay) {
    return response.status(400).json({ message: "already booked" })
  }

  const appointment = appointmentsRepository.create({ provider, date: parseOfDate })

  return response.json(appointment)

})

export default appointmentsRouter
