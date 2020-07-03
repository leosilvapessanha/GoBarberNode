import Appointment from '../model/appointments'
import Appointments from '../model/appointments'
import { isEqual } from 'date-fns'

interface DTO{
  provider: string,
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointments[]

  constructor() {
    this.appointments = []
  }

  public all() {
    return this.appointments
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment => {
      isEqual(date, appointment.date)
    })
    return findAppointment || null
  }


  public create({provider, date}: DTO): Appointments {
    const appointment = new Appointments({provider, date})
    this.appointments.push(appointment)
    return appointment
  }
}

export default AppointmentsRepository
