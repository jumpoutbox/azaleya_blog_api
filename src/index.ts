import { server} from './server/Server';

server.listen(process.env.PORT || 3003, () => console.log("Your Api is run on http://localhost:3003"));

