import React, { useEffect, useState } from "react";
import Type from "./Type";

const DamageRelation = ({ damages }) => {
  const [damagePokemonForm, setDamagePokemonForm] = useState();

  useEffect(() => {
    // damages 데이터 가공
    const arrayDamage = damages.map((damage) =>
      seperateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      // 합치는 부분
      const obj = joinDamageRelations(arrayDamage);
      const res = reduceDuplicateValues(postDamageValue(obj.from));
      setDamagePokemonForm(res);
    } else {
      const res = postDamageValue(arrayDamage[0].from);
      setDamagePokemonForm(res);
    }
  }, []);

  // type이 두개일 때
  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, "to"),
      from: joinObjects(props, "from"),
    };
  };

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);
      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});

    return result;
  };

  const filterForUniqueValues = (valueForFiltering, damageValue) => {
    const result = valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;

      const filterAcc = acc.filter((a) => a.name !== name);

      return filterAcc.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterAcc]);
    }, []);

    return result;
  };

  const joinObjects = (props, string) => {
    const key = string;
    const fristArrayValue = props[0][key]; // 첫번째 타입
    const secondArrayValue = props[1][key]; // 두번째 타입

    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]) => {
        const result = fristArrayValue[keyName].concat(value); // concat으로 secondvalue 에 있는 것들을 더해줌
        return (acc = { [keyName]: result, ...acc }); // acc에 쌓인 데이터도 합쳐야 되서 ...acc 해줌
      },
      {}
    );

    return result;
  };

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

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(([keyName, value]) => {
            const key = keyName;
            const valueOfKey = {
              double_damage: "Week",
              half_damage: "Resistant",
              no_damage: "Immune",
            };

            return (
              <div key={key}>
                <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center">
                  {valueOfKey[key]}
                </h3>
                <div className="flex flex-wrap gap-1 justify-center">
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => {
                      return (
                        <Type type={name} key={url} damageValue={damageValue} />
                      );
                    })
                  ) : (
                    <Type type={"none"} key={"none"} />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DamageRelation;
