class CategoryMapper {
  toPersistence(domainCategory) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }

  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
