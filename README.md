# React Remita Inline

This is a wrapper around Remita Inline SDK for React projects.

## Install

**NPM**

```bash
npm install @farayolaj/rri
```

**Yarn**

```bash
yarn add @farayolaj/rri
```

**PNPM**

```bash
pnpm add @farayolaj/rri
```

## Usage

1. Imperative API.

```jsx
import { useRemitaInline } from "@farayolaj/rri";

function Example() {
  const { initPayment } = useRemitaInline({
    isLive: false,
    onClose() {
      console.log("Remita closed");
    },
    onError(response) {
      console.log("Remita Error: ", response);
    },
    onSuccess(response) {
      console.log("Remita Success: ", response);
    },
  });

  return (
    <button
      onClick={() =>
        initPayment({
          key: config.remita.publicKey,
          transactionId: String(Math.floor(Math.random() * 1101233)),
          amount: 10000,
          customerId: "johndoe@gmail.com",
          narration: "Payment for groceries.",
          email: "johndoe@gmail.com",
          firstName: "John",
          lastName: "Doe",
        })
      }
    >
      Checkout
    </button>
  );
}
```

2. Declarative API.

```jsx
import { useRemitaInline } from "@farayolaj/rri";

function Example() {
  const { RemitaInlineButton } = useRemitaInline({
    isLive: false,
    onClose() {
      console.log("Remita closed");
    },
    onError(response) {
      console.log("Remita Error: ", response);
    },
    onSuccess(response) {
      console.log("Remita Success: ", response);
    },
  });

  return (
    <RemitaInlineButton
      data={{
        key: config.remita.publicKey,
        transactionId: String(Math.floor(Math.random() * 1101233)),
        amount: 10000,
        customerId: "johndoe@gmail.com",
        narration: "Payment for groceries.",
        email: "johndoe@gmail.com",
        firstName: "John",
        lastName: "Doe",
      }}
      className="button-primary"
      text="Checkout"
    />
  );
}
```

## Types

### UseRemitaInlineProps

`useRemitaInline(UseRemitaInlineProps)`

| Property  | Type       | Default | Description                        | Required |
| --------- | ---------- | ------- | ---------------------------------- | -------- |
| isLive    | `boolean`  |         | Use demo or live SDK.              | `true`   |
| onSuccess | `Function` |         | Callback for successful payment.   | `false`  |
| onError   | `Function` |         | Callback for error during payment. | `false`  |
| onClose   | `Function` |         | Callback for payment modal close.  | `false`  |

### RemitaInlineButtonProps

`<RemitaInlineButton {...RemitaInlineButtonProps} />`

| Property  | Type               | Default | Description               | Required |
| --------- | ------------------ | ------- | ------------------------- | -------- |
| data      | `RemitaInlineData` |         | Options needed by Remita. | `true`   |
| className | `string`           |         | Class names for styling.  | `false`  |
| text      | `string`           | "Pay"   | Text to show in button.   | `false`  |

### RemitaInlineData

Options needed by Remita Inline SDK. More information about this [here](https://www.remita.net/developers/#/payment/inline).
