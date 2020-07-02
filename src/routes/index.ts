import { Router } from 'express';


const routes = Router();

routes.post('/user', (request,response)=>{
  const {name, email} = request.body

  const user = {
    name,
    email
  }
  return response.json(user)
})

// const routess = routesr();
export default routes;
