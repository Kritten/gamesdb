export class ServiceApp {
  static async initialize() {
    const payload = {};

    const response = await fetch(`${process.env.VUE_APP_API_ENDPOINT}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:
        '{"operationName":null,"variables":{},"query":"{\\n  games {\\n    id\\n    name\\n  }\\n}\\n"}'
      // body: JSON.stringify(payload)
    });
    console.warn(response, "response");
    // try {
    //   // const response = await apolloClient.query({
    //   //   query: queryInitial
    //   // });
    // } catch (e) {}
  }
}
