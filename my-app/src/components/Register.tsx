import { useState, type ChangeEvent } from "react";
import { Button, Form } from "react-bootstrap";

interface RegisterForm {
  username: string;
  password: string;
  email: string;
  address: string;
}

const initialRegisterForm: RegisterForm = {
  username: "",
  password: "",
  email: "",
  address: "",
};

export default function Register() {
  const [data, setData] = useState<RegisterForm>(initialRegisterForm);

  function handleSubmit(event) {
    event.preventDefault();
    console.log("form is submitted");
  }

  function set<K extends keyof RegisterForm>(field: K, value: RegisterForm[K]) {
    setData((current) => ({ ...current, [field]: value }));
  }

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    set(name, value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.username">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={data.username}
          placeholder="Enter Username"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="name@example.com"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          value={data.password}
          onChange={handleChange}
          type="password"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          as="textarea"
          name="address"
          value={data.address}
          onChange={handleChange}
          rows={3}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.address">
        <Button type="submit" className="btn btn-primary">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
