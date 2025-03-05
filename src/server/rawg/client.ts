import createClient from "openapi-fetch";
import { type paths } from "~/lib/api-types/schema";

const rawgClient = createClient<paths>({ baseUrl: "https://api.rawg.io/api" });

export default rawgClient;
