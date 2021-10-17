import {InputCollection} from "./collection/collection.input";
import {format} from 'date-fns';

export const handleRelation = ({entities}: {entities: Array<string>}) => {
  return {
    connect: entities.map((entity) => ({
      id: entity,
    })),
  };
}


export const getPagination = (data: InputCollection) => {
  if (data.count === null) {
    return '';
  }

  return `LIMIT ${data.count} OFFSET ${(data.page - 1) * data.count}`;
};

export const getOrderBy = (data: InputCollection) => {
  if (data.sortBy.length === 0) {
    return '';
  }

  return `ORDER BY ${data.sortBy.map((sortBy, index) => `'${sortBy}' ${data.sortDesc[index] ? 'desc' : 'asc'}`).join(', ')}`;
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

    return {[sortBy]: data.sortDesc[index] ? 'desc' : 'asc'};
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
      value = filter.valueString;
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

export const getWhere = (data: InputCollection) => {
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

    where.push(`${filter.field} ${filter.operator} ${valueFormatted}`);

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
