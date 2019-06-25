import React, { useState, FunctionComponent as SFC } from "react";
import { TouchableOpacity, SectionList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Column, Row, Heading2, Heading3 } from "../../components";
import { colors, fonts, margins } from "../../styles";
import Fuse from "fuse.js";
import countries from "./components/countries.json";
import styled from "styled-components/native";
import R from "ramda";

interface Country {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const fuseOptions = {
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: ["name", "dial_code"]
};

const fuse = new Fuse(countries, fuseOptions);

const Page = styled(Column)`
  background-color: ${colors.blue};
`;
const Header = styled(Column)`
  margin-horizontal: ${margins.base};
`;
const InputView = styled(Row)`
  background-color: ${colors.white};
  margin-top: ${margins.small};
  margin-bottom: ${margins.base};
  height: ${44};
  border-radius: 4;
  align-items: center;
`;
const Input = styled.TextInput`
  color: ${colors.darkGrey};
  font-size: ${fonts.heading3.fontSize}
  font-weight: ${fonts.heading3.fontWeight}
  flex: 1;
`;
const List = styled(SectionList)`
  background-color: ${colors.white};
  padding-horizontal: ${margins.base};
`;
const Cell = styled(({ name, flag, style }) => (
  <Row expand style={style}>
    <Heading3>
      {flag} {name}
    </Heading3>
  </Row>
))`
  height: 50;
  align-items: center;
  border-bottom-width: 1;
  border-bottom-color: ${colors.lightGrey};
`;
interface CountriesProps {
  onDone: (country?: Country) => void;
}
const Countries: SFC<CountriesProps> = ({ onDone }) => {
  const [country, setCountry] = useState("");
  const filteredCountries = R.map(
    ([title, data]) => ({ title, data }),
    R.toPairs(
      R.groupBy(
        item => item.name.substr(0, 1),
        country ? fuse.search(country) : countries
      )
    )
  );
  return (
    <Page expand>
      <Header safe>
        <TouchableOpacity onPress={() => onDone()}>
          <Icon name="ios-close" size={44} color={colors.white} />
        </TouchableOpacity>
        <Heading2 color={colors.white} weight="600">
          Select your country
        </Heading2>
        <InputView>
          <Icon
            name="ios-search"
            size={27}
            color={colors.grey}
            style={{ margin: margins.tiny }}
          />
          <Input
            placeholder="Choose Your Country"
            value={country}
            onChangeText={setCountry}
            autoCorrect={false}
          />
        </InputView>
      </Header>
      <List
        contentContainerStyle={{ paddingTop: 20 }}
        sections={filteredCountries}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onDone(item)}>
            <Cell {...item} />
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Row expand style={{ backgroundColor: colors.white }}>
            <Heading3 weight="700">{title}</Heading3>
          </Row>
        )}
        keyExtractor={x => x.name}
      />
    </Page>
  );
};

export default Countries;
