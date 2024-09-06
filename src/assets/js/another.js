import $ from "jquery";
import { greet } from "./modules/greet";

$("body")
  .css("color", "red")
  .append(`<p>${greet("Maro Another")}</p>`);
