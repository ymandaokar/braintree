import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
var createClient = require("braintree-web/client").create;

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};
function braintreeApi() {
  createClient(
    {
      authorization: "sandbox_qb24q79k_xw53vx33b4wvmthn"
    },
    function(createErr, clientInstance) {
      if (createErr) {
        console.error(createErr);
        return;
      }
      var data = {
        creditCard: {
          number: "4111111111111111",
          cvv: "832",
          expirationDate: "10/20",
          options: {
            validate: false
          }
        }
      };

      // Warning: For a merchant to be eligible for the easiest level of PCI compliance (SAQ A),
      // payment fields cannot be hosted on your checkout page.
      // For an alternative to the following, use Hosted Fields.
      clientInstance.request(
        {
          endpoint: "payment_methods/credit_cards",
          method: "post",
          data: data
        },
        function(requestErr, response) {
          // More detailed example of handling API errors: https://codepen.io/braintree/pen/MbwjdM
          if (requestErr) {
            throw new Error(requestErr);
          }

          console.log("Got nonce:", response.creditCards[0].nonce);
        }
      );
    }
  );
}

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Start editing to see some magic happen {"\u2728"}</h2>
    <button onClick={braintreeApi}>braintree</button>
  </div>
);

render(<App />, document.getElementById("root"));
