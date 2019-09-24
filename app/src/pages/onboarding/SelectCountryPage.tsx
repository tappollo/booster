import { SafeAreaView } from "react-native";
import { useState } from "react";
import { Searchbar } from "react-native-paper";
import { NavigationStackScreenComponent } from "react-navigation-stack";
import React from "react";
import DisableIQKeyboardWhenFocused from "../../components/DisableIQKeyboardWhenFocused";
import styled from "styled-components";

const SearchInput = styled(Searchbar).attrs({
  autoFocus: true,
  placeholder: "Search",
  icon: { source: "arrow-back", direction: "auto" }
})`
  margin: 4px 15px;
`;

const SelectCountryPage: NavigationStackScreenComponent<{}> = ({
  navigation
}) => {
  const [query, setQuery] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DisableIQKeyboardWhenFocused />
      <SearchInput
        onChangeText={setQuery}
        value={query}
        onIconPress={() => navigation.goBack()}
        style={{ margin: 4 }}
      />
    </SafeAreaView>
  );
};

export default SelectCountryPage;
