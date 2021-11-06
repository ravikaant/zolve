import { useCallback, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import './styles.css';

export default function Graph() {
  const getSecondsOfDate = date => {
    console.log('date:', date)
    const dateParts = date.split('-');
    const dateObj = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    return dateObj.getTime() / 1000;
  }
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [fromDate, setFromDate] = useState('2019-03-04');
  const [toDate, setToDate] = useState('2021-07-09');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(30);
  console.log(window.screen)

  const fetchData = useCallback(() => {
    setLoading(true);
    fetch(`https://api.stackexchange.com/2.3/tags?key=U4DMV*8nvpm3EOpvf69Rxw((&site=stackoverflow&page=${page}&pagesize=${pageSize}&fromdate=${getSecondsOfDate(fromDate)}&todate=${getSecondsOfDate(toDate)}&order=desc&sort=popular&filter=default`)
      .then(res => res.json())
      .then(res => {
        const items = res.items.map(item => ({ count: item.count, language: item.name, color: '#' + Math.floor(Math.random() * 16777215).toString(16) }));
        setData(items);
        setLoading(false);
      }).catch(err => { setLoading(false) });
  }, [pageSize, page, fromDate, toDate]);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main>
      <h2>Graph</h2>
      <div className="filterContainer">
        <div>
          <div className="filter"><label>From Date</label><input id="fromDate" type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} /></div>
          <div className="filter"><label>To Date</label><input id="toDate" type="date" value={toDate} onChange={e => setToDate(e.target.value)} /></div>
        </div>
        <div>
          <div className="filter"><label>Page Size</label><input id="pageSize" value={pageSize} onChange={e => setPageSize(e.target.value)} /></div>
          <div className="filter"><label>Page</label><input id="page" value={page} onChange={e => setPage(e.target.value)} /></div>
        </div>
      </div>
      <button onClick={fetchData}>Apply Filters</button>
      {loading &&
        <div className="loaderContainer">
          <div className="loader" />
        </div>}
      {!loading && <Bar
        data={{
          labels: data.map(item => item.language),
          datasets: [
            {
              label: "count",
              data: data.map(item => item.count),
              backgroundColor: data.map(item => item.color),
              borderColor: data.map(item => item.color),
              borderWidth: 0.5,
            },
          ],
        }}
        height={window.screen.width < 600 ? 500 : 100}
        options={{
          indexAxis: window.screen.width < 600 ? 'y' : 'x',
          maintainAspectRatio: true,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: false,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 15,
            },
          },
        }}
      />}
    </main>
  );
}