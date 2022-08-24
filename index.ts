import { format } from "./date";

const NOW = 1661349185270;

const a = format(NOW, "Y:M:D");
const b = format(NOW, "Y/M/D");
const c = format(NOW, "M/D/Y");
