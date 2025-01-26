import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Home() {
  return (
    <main>
      <SwaggerUI url="/swagger.yaml" />
    </main>
  );
}
