import { FlatList, Text } from "react-native";
import React, { useRef, useState } from "react";
import { List, Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { Country } from "./components/PhoneNumberInput";
import Fuse from "fuse.js";
import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { OnBoardingParams } from "./index";

const Container = styled.View`
  flex: 1;
  padding-top: 10px;
`;

const useFuse = () => {
  const fuseOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 1,
    keys: ["name", "dial_code"],
  };
  return useRef(new Fuse(countries, fuseOptions)).current;
};

const countries: Country[] = require("./assets/countries.json");

const SearchInput = styled(Searchbar).attrs({
  autoFocus: true,
  placeholder: "Search",
  icon: { source: "arrow-left", direction: "auto" },
})`
  margin: 4px 15px;
`;

export interface SelectCountryPageParams {
  onSelect: (country: Country) => void;
}

const SelectCountryPage = ({
  route,
  navigation,
}: {
  route: RouteProp<OnBoardingParams, "SelectCountryPage">;
  navigation: StackNavigationProp<OnBoardingParams>;
}) => {
  const fuse = useFuse();
  const [query, setQuery] = useState("");
  const dataSource = query ? fuse.search(query) : countries;
  const onSelect = route.params.onSelect;
  return (
    <Container>
      <SearchInput
        onChangeText={setQuery}
        value={query}
        onIconPress={() => navigation.pop()}
        style={{ margin: 4 }}
      />
      <FlatList
        keyboardShouldPersistTaps="always"
        keyExtractor={(country) => country.code}
        data={dataSource}
        renderItem={({ item }) => (
          <List.Item
            description={item.dial_code}
            left={(props) => (
              <List.Icon
                {...props}
                icon={() => <Text style={{ fontSize: 25 }}>{item.flag}</Text>}
              />
            )}
            onPress={() => {
              onSelect(item);
              navigation.goBack();
            }}
            title={item.name}
          />
        )}
      />
    </Container>
  );
};

export default SelectCountryPage;
