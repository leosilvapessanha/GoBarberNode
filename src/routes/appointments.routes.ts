import { Router } from 'express'
import {  parseISO } from 'date-fns'
import AppointmentsRepository from "../repositories/appointmentsRepository"
import CreateAppointmentService from '../services/CreateAppointmentServices'

const appointmentsRouter = Router()

const appointmentsRepository = new AppointmentsRepository()

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const ParseDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository)

    const appointment = createAppointment.execute({date: ParseDate, provider: provider})

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({error: err.message})
  }

})

export default appointmentsRouter
