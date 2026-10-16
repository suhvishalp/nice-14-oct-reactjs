
import { Alert, Button } from "react-bootstrap";

import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router";

export function RouteErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;

    message =
      typeof error.data === "string"
        ? error.data
        : error.statusText;

  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="p-4">
      <Alert variant="danger">
        <Alert.Heading>{title}</Alert.Heading>
        <p>{message}</p>
      </Alert>

      <Button onClick={() => navigate("/products")}>
        Back to Products
      </Button>
    </div>
  );
}
