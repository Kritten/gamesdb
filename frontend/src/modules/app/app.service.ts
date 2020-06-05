export class ServiceApp {
  static async initialize() {
    try {
      const response = await apolloClient.query({
        query: queryInitial
      });
    } catch (e) {}
  }
}
