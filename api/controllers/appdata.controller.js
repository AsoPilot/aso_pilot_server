import { appdataService } from "../services/index.js"
import { response, catchAsync, ApiError } from '../utils/index.js'

class appdataController {

    appdatacontroller = catchAsync(async (req, res) => {
        const Response = new response(res)
        // try {
        const result = await appdataService.appdataservice(req.body, req.user);
        // return result
        return Response.success('fetched Successfully', 'SUCCESS', 200, result)

        // } catch (error) {
        //     console.error('error @ createAccount Controller', error)
        //     throw new ApiError(500, error)
        // }

    })

    replycontroller = catchAsync(async (req, res) => {
        const Response = new response(res)
        // try {
        const result = await appdataService.replyservice(req.body, req.user);
        return Response.success('fetched Successfully', 'SUCCESS', 200, result)

        // } catch (error) {
        //     console.error('error @ createAccount Controller', error)
        //     throw new ApiError(500, error)
        // }

    })

    integrationcontroller = catchAsync(async (req, res) => {
        const Response = new response(res)
        // try {
        const result = await appdataService.integrationservice(req.body, req.user);
        return Response.success('Integrated Successfully', 'SUCCESS', 200, result)

        // } catch (error) {
        //     console.error('error @ createAccount Controller', error)
        //     throw new ApiError(500, error)
        // }

    })
}

export default new appdataController()