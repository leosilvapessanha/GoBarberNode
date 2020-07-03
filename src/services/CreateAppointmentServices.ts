import appointment from '../model/appointments'
import Appointments from '../model/appointments'
import AppointmentsRepository from '../repositories/appointmentsRepository'
import { startOfHour } from 'date-fns'


interface RequestDTO{
  provider: string,
  date: Date;
}

class CreateAppointmentService {

  private appointmentsRepository: AppointmentsRepository

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository

  }
  public execute({date, provider}: RequestDTO): Appointments {
    const appointmentDate = startOfHour(date)

    const findAppointmenteInTheSameDay = this.appointmentsRepository.findByDate(appointmentDate)

    if (findAppointmenteInTheSameDay) {
      throw Error('already booked')
      //return response.status(400).json({ message: "already booked" })
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate
    })
    return appointment
  }
}

export default CreateAppointmentService
