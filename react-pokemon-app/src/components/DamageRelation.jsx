import React, { useEffect } from "react";

const DamageRelation = ({ damages }) => {
  useEffect(() => {
    // damages 데이터 가공
    const arrayDamage = damages.map((damage) =>
      seperateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      // 합치는 부분
    } else {
      postDamageValue(arrayDamage[0].from);
    }
  }, []);

  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const valuesOfKeyName = {
        double_damage: "2x",
        half_damage: "1/2x",
        no_damage: "0x",
      };
      return (acc = {
        [keyName]: value.map((i) => ({
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});

    return result;
  };

  // from, to 구분
  const seperateObjectBetweenToAndFrom = (damage) => {
    // from 키워드 필터링
    const from = filterDamageRelations("_from", damage);
    // to 키워드 필터링
    const to = filterDamageRelations("_to", damage);

    return { from, to };
  };

  // 필터링해주는 함수
  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage)
      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })
      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});

    return result;
  };

  return <div>DamageRelation</div>;
};

export default DamageRelation;
