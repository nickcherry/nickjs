import { port } from '@server/constant/env';
import { server } from '@server/server';

server.listen(port);
console.log(`Listening on http://localhost:${port}`);
