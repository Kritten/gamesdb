import { InputCollection } from "./collection/collection.input";
import { format } from 'date-fns';

export const handleRelation = ({ nameEntity, entities }: { nameEntity: string, entities: Array<string> }) => {
  return {
    create: entities.map((entity) => ({
      [nameEntity]: {
        connect: {
          id: parseInt(entity),
        }
      }
    })),
  };
}


export const getPagination = (data: Partial<InputCollection>) => {
  if (data.count === undefined || data.page === undefined) {
    return '';
  }

  if (data.count === null) {
    return '';
  }

  return `LIMIT ${data.count} OFFSET ${(data.page - 1) * data.count}`;
};

export const getOrderBy = (data: Partial<InputCollection>) => {
  if (data.sortBy === undefined || data.sortDesc === undefined) {
    return '';
  }

  if (data.sortBy.length === 0) {
    return '';
  }

  return `ORDER BY ${data.sortBy.map((sortBy, index) => `${sortBy} ${data.sortDesc[index] ? 'desc' : 'asc'}`).join(', ')}`;
};

export const inputCollectionToPrisma = (data: InputCollection) => {
  const result: Record<string, unknown> = {};

  if (data.count !== null) {
    result.take = data.count;
    result.skip = (data.page - 1) * data.count;
  }

  result.orderBy = data.sortBy.map((sortBy, index) => {
    if (sortBy.startsWith('entity.')) {
      sortBy = sortBy.replace('entity.', '');
    }

    return { [sortBy]: data.sortDesc[index] ? 'desc' : 'asc' };
  });

  const filters = {};

  for (let i = 0; i < data.filters.length; i++) {
    const filter = data.filters[i];
    let value;
    if (filter.valueBoolean !== undefined) {
      value = filter.valueBoolean;
    } else if (filter.valueFloat !== undefined) {
      value = filter.valueFloat;
    } else if (filter.valueInt !== undefined) {
      value = filter.valueInt;
    } else if (filter.valueString !== undefined) {
      const number = parseInt(filter.valueString, 10)
      if (isNaN(number) === false) {
        value = number;
      } else {
        value = filter.valueString;
      }
    } else if (filter.valueDate !== undefined) {
      value = filter.valueDate;
      // value = `'${format(new Date(filter.valueDate), 'yyyy-MM-dd HH:mm:ss')}'`;
    } else if (filter.valueRange !== undefined) {
      value = filter.valueRange;
    }

    if (value === undefined || value === -1) {
      continue;
    }
    // const valueFormatted = filter.operator !== 'like' ? value : `'%${value}%'`;

    filters[filter.field] = value;
    // where.push(`${filter.field} ${filter.operator} ${valueFormatted}`);

    // let nameFunctionWhere = 'where';
    // if (i > 0) {
    //   nameFunctionWhere = 'andWhere';
    // }
    //
    // let operation = `${filter.operator} :${indexParams}`;
    // let params = {
    //   [indexParams]: valueFormatted,
    // };
    //
    // if (Array.isArray(value)) {
    //   if (value[1] === 100) {
    //     operation = `>= :${indexParams}`;
    //     params = {
    //       [indexParams]: value[0],
    //     };
    //     indexParams += 1;
    //   } else {
    //     operation = `${filter.operator} :${indexParams} and :${indexParams +
    //     1}`;
    //     params = {
    //       [indexParams]: value[0],
    //       [indexParams + 1]: value[1],
    //     };
    //     indexParams += 2;
    //   }
    // } else {
    //   indexParams += 1;
    // }

    // if (filter.field.includes('.')) {
    //   query[nameFunctionWhere](`${filter.field} ${operation}`, params);
    // } else {
    //   query[nameFunctionWhere](`entity.${filter.field} ${operation}`, params);
    // }

  }

  result.where = filters;

  return result;
};

export const getWhere = (data: Partial<InputCollection>) => {
  if (data.filters === undefined) {
    return '';
  }

  const where = [];

  // const indexParams = 0;
  for (let i = 0; i < data.filters.length; i++) {
    const filter = data.filters[i];
    let value;
    if (filter.valueBoolean !== undefined) {
      value = filter.valueBoolean;
    } else if (filter.valueFloat !== undefined) {
      value = filter.valueFloat;
    } else if (filter.valueInt !== undefined) {
      value = filter.valueInt;
    } else if (filter.valueString !== undefined) {
      value = filter.valueString;
    } else if (filter.valueDate !== undefined) {
      value = `'${format(new Date(filter.valueDate), 'yyyy-MM-dd HH:mm:ss')}'`;
    } else if (filter.valueRange !== undefined) {
      value = filter.valueRange;
    }

    if (value === undefined || value === -1) {
      continue;
    }

    const valueFormatted = filter.operator !== 'like' ? value : `'%${value}%'`;

    if (filter.operator === 'between') {
      if (value[0] === null && value[1] === null) {
        // SKIP
      } else if (value[0] === null) {
        where.push(`${filter.field} <= ${value[1]}`);
      } else if (value[1] === null) {
        where.push(`${filter.field} >= ${value[0]}`);
      } else {
        where.push(`${filter.field} BETWEEN ${value[0]} AND ${value[1]}`);
      }
    } else if (filter.operator === 'in') {
      where.push(`${filter.field} ${filter.operator} (${valueFormatted})`);
    } else {
      where.push(`${filter.field} ${filter.operator} ${valueFormatted}`);
    }


    // let nameFunctionWhere = 'where';
    // if (i > 0) {
    //   nameFunctionWhere = 'andWhere';
    // }
    //
    // let operation = `${filter.operator} :${indexParams}`;
    // let params = {
    //   [indexParams]: valueFormatted,
    // };
    //
    // if (Array.isArray(value)) {
    //   if (value[1] === 100) {
    //     operation = `>= :${indexParams}`;
    //     params = {
    //       [indexParams]: value[0],
    //     };
    //     indexParams += 1;
    //   } else {
    //     operation = `${filter.operator} :${indexParams} and :${indexParams +
    //     1}`;
    //     params = {
    //       [indexParams]: value[0],
    //       [indexParams + 1]: value[1],
    //     };
    //     indexParams += 2;
    //   }
    // } else {
    //   indexParams += 1;
    // }

    // if (filter.field.includes('.')) {
    //   query[nameFunctionWhere](`${filter.field} ${operation}`, params);
    // } else {
    //   query[nameFunctionWhere](`entity.${filter.field} ${operation}`, params);
    // }

  }

  if (where.length === 0) {
    return '';
  }

  return `WHERE ${where.join(' AND ')}`;
}

export const getQuery = (query: string, data: Partial<InputCollection> = {}, extractCount = false) => {
  const where = getWhere(data);
  const orderBy = getOrderBy(data);
  const pagination = getPagination(data);

  return `
    ${query}
    ${where}
    ${extractCount ? '' : 'GROUP BY entity.id'}
    ${orderBy}
    ${extractCount ? '' : pagination}
  `;
}
