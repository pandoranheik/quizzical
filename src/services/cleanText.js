import { decode } from "html-entities";

export default function cleanText(text) {
	return decode(text);
}
