export const handleRelation = ({entities}: {entities: Array<string>}) => {
  return {
    connect: entities.map((entity) => ({
      id: entity,
    })),
  };
}
