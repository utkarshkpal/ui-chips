import React, { Component } from 'react';
import './Chip.css';

class Chips extends Component {
  state = {
    dataSource: [
      { name: 'utkarsh' },
      { name: 'anshul' },
      { name: 'ashish' },
      { name: 'nishant' },
      { name: 'kshitiz' }
    ],
    list: [],
    searchTerm: '',
    listVisibility: false,
    selectedChips: []
  };

  componentDidMount() {
    const { dataSource } = this.state;
    this.setState({ list: dataSource });
  }

  filterData = data => {
    const { searchTerm } = this.state;
    return data.filter(elem => {
      const { searchTerm } = this.state;
      return elem.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  };

  addSelectedChip = elem => {
    const { selectedChips, list } = this.state;
    if (!selectedChips.includes(elem)) {
      const updatedSelectedChips = [...selectedChips, elem];
      const updatedList = list.filter(listItem => {
        return listItem.name != elem;
      });

      this.setState({
        selectedChips: updatedSelectedChips,
        list: updatedList,
        listVisibility: false,
        searchTerm: ''
      });
    }
  };

  removeSelectedChip = elem => {
    let { selectedChips, list } = this.state;
    var index = selectedChips.indexOf(elem);

    if (index > -1) {
      selectedChips.splice(index, 1);
      list.push({ name: elem });
    }

    this.setState({ selectedChips, list, listVisibility: false });
  };

  render() {
    const { selectedChips } = this.state;
    return (
      <div className="outer">
        <div className="main">
          <SelectedChips
            removeSelectedChip={this.removeSelectedChip}
            selectedChips={selectedChips}
          />
          <div className="line" />

          <div className="holder">
            <input
              onClick={() => {
                this.setState({ listVisibility: true });
              }}
              onChange={e => {
                this.setState({ searchTerm: e.target.value });
              }}
              onBlur={() => {
                this.setState({ listVisibility: true });
              }}
              type="text"
              value={this.state.searchTerm}
            />
            <List
              visibility={this.state.listVisibility}
              data={this.filterData(this.state.list)}
              selectedChips={selectedChips}
              addSelectedChip={this.addSelectedChip}
            />
          </div>
        </div>
      </div>
    );
  }
}

const SelectedChips = ({ selectedChips, removeSelectedChip }) => {
  if (selectedChips.length) {
    return (
      <div className="all-chips">
        {selectedChips.map(chip => {
          return [
            <div className="chip">
              <div className="chip-name">{chip}</div>
              <div
                className="remove"
                onClick={() => {
                  removeSelectedChip(chip);
                }}
              >
                X
              </div>
            </div>
          ];
        })}
      </div>
    );
  } else {
    return null;
  }
};

const List = ({ visibility, data, addSelectedChip }) => {
  if (visibility) {
    return (
      <div className="list">
        {data.map(elem => {
          return [
            <div
              className="list-item"
              onClick={() => {
                addSelectedChip(elem.name);
              }}
            >
              {elem.name}
            </div>
          ];
        })}
      </div>
    );
  } else {
    return null;
  }
};

export default Chips;
