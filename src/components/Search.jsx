import { Form } from "react-bootstrap"
export default function Search({ onChange }) {
  return <input type="text" onChange={onChange} placeholder="Search.." />
}
