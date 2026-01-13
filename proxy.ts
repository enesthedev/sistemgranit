import { chain } from "@nimpl/proxy-chain";
import { supabaseProxy } from "./lib/supabase/proxy";

export default chain([
  [
    supabaseProxy,
    {
      include: new RegExp(
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"
      ),
    },
  ],
]);
