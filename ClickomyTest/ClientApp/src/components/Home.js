import React, { Component } from 'react';
import Select from 'react-select';
//import '@progress/kendo-theme-material';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import './Home.css';
const options = [
    { value: 'Game+of+Thrones', label: 'Game of Thrones' },
    { value: 'Breaking+Bad', label: 'Breaking Bad' },
    { value: 'Rick+and+Morty', label: 'Rick and Morty' },
    { value: 'The+Sopranos', label: 'The Sopranos' },
    { value: 'Sherlock', label: 'Sherlock' },

];

export class Home extends Component {
    constructor() {
        super()
        this.state = {
            dataSeries: '',
            loading: false,
            Seasons: false,
            dataSeasons: ''

        }
        this.seasonRef = React.createRef();
    }

    getPropertyWithTitle = (e) => {
        console.log(this.seasonRef.current?.clearValue());
         fetch(`/api/webapi/GetParameters?title=${e.value}`)
             .then((response) => response.json())
             .then(data => {
                 this.setState({ dataSeries: data, loading: true, Seasons: false, dataSeasons: '' });
                 
             });
        

    };
    getPropertyOfSeasons = (e) => {
        
        if (!e) return;
        fetch(`api/webapi/GetSeason?title=${e.value}&season=${e.label}`)
            .then((response) => response.json())
            .then(data => {
                this.setState({ loading: true, Seasons: true, dataSeasons: data });
                console.log(this.state.dataSeasons)
            });


    };


    createElements(n,title) {
        var elements = [];
        for (var i = 1; i <= n; i++) {
            elements.push({ value: title, label: i });
        }
        return elements;
    }


  render () {
    return (
        <div>
           

            <Select
                
                onChange={this.getPropertyWithTitle}
                options={options}
                placeholder="select series..."

            />
            {this.state.loading && (
                <div>
                    <h3>{this.state.dataSeries.title}</h3>

                    <div id="data">
                        <div className="all_parameters">
                            <p><b>year:</b> {this.state.dataSeries.year}</p>
                            <p><b>imdbRating:</b> {this.state.dataSeries.imdbRating}</p>
                            <p><b>type:</b> {this.state.dataSeries.type}</p>
                            <p><b>totalSeasons:</b> {this.state.dataSeries.totalSeasons}</p>
                        </div>
                        <img className="poster" src={this.state.dataSeries.poster} alt={this.state.dataSeries.title} ></img>
                    </div>
                    <Select
                        className="select_season"
                        placeholder="select season..."

                        options={this.createElements(this.state.dataSeries.totalSeasons, this.state.dataSeries.title)}
                        onChange={this.getPropertyOfSeasons}
                        ref={this.seasonRef}
                    />
                    
                </div>

            )}

            <div>
          

                {this.state.Seasons &&
                    <Grid style={{
                        height: '400px'
                }} data={this.state.dataSeasons.Episodes}>
                    <GridColumn field="Title" title="Title"  />
                    <GridColumn field="Released" title="Released"  />
                    <GridColumn field="Episode" title="Episode" />
                    <GridColumn field="imdbRating" title="imdbRating" />
                        
                    </Grid>

                    
                       
                    }
                
            </div>
      </div>
    );
  }
}
