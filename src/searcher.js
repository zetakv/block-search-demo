import React, { useState } from 'react';
// import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
// import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
// import Divider from '@mui/material/Divider';
import './searcher.css';

function Searcher() {
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [blockData, setBlockData] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleSearchCLick = () => {
    setLoading(true);
    fetch(`https://blockchain.info/rawblock/${searchText}`)
      .then((resp) => resp.json())
      // eslint-disable-next-line
      .then(resp => {
        setBlockData(resp);
        setPage(1);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handlePaginationChange = (event, value) => {
    setPage(value);
  };
  const IntlNumberFormat = new Intl.NumberFormat();
  const formatNumber = (val) => IntlNumberFormat.format(val);
  const formatTimestamp = (timestamp) => new Date(timestamp).toLocaleString().substring(0, 16);
  const curPageTransactions = (blockData?.tx || []).slice((page - 1) * pageSize, page * pageSize - 1);
  const blockTransactions = () =>
    blockData.tx && blockData.tx.length ? (
      <>
        <Card sx={{ marginTop: 1 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom component="div">
              Block Transaction
            </Typography>
            <Pagination
              color="primary"
              count={Math.ceil(blockData.tx.length / pageSize)}
              page={page}
              siblingCount={0}
              onChange={handlePaginationChange}
            />
          </CardContent>
        </Card>
        {curPageTransactions.map((item) => (
          <Card key={item.hash} sx={{ marginTop: 1 }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Amount
                  </Typography>
                </Grid>
                <Grid item xs={6} md={8} sx={{ textOverflow: 'ellipsis' }}>
                  -
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Fee
                  </Typography>
                </Grid>
                <Grid item xs={6} md={8} sx={{ textOverflow: 'ellipsis' }}>
                  {formatNumber(item.fee)}
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Hash
                  </Typography>
                </Grid>
                <Grid item xs={6} md={8} sx={{ textOverflow: 'ellipsis' }}>
                  {item.hash}
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    Date
                  </Typography>
                </Grid>
                <Grid item xs={6} md={8} sx={{ textOverflow: 'ellipsis' }}>
                  {formatTimestamp(item.time * 1000)}
                </Grid>
                <Grid item xs={3} md={2}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    From
                  </Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  {item.inputs.map((input) => (
                    <div key={input.prev_out.addr}>
                      <div className="text-ellipsis">{input.prev_out.addr || '-'}</div>
                      <div>{input.prev_out.value / 10000000}</div>
                    </div>
                  ))}
                </Grid>
                <Grid item xs={3} md={2}>
                  <Typography variant="subtitle1" gutterBottom component="div">
                    To
                  </Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  {item.out
                    .filter((out) => out.spent)
                    .map((out) => (
                      <div key={out.addr}>
                        <div className="text-ellipsis">{out.addr || '-'}</div>
                        <div>{out.value / 10000000}</div>
                      </div>
                    ))}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </>
    ) : (
      ''
    );
  return (
    <div className="searcher">
      <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">搜索</InputLabel>
        <Input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end" onClick={handleSearchCLick}>
                <Search />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <div className="result-container">
        {blockData ? (
          <>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom component="div">
                  Block {blockData.block_index}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Hash
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8} sx={{ textOverflow: 'ellipsis' }}>
                    {blockData.hash}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Confirmations
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Timestamp
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {formatTimestamp(blockData.time * 1000)}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Height
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {blockData.height}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Miner
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Number of Transactions
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {blockData.tx?.length}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Difficulty
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Merkle root
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8} sx={{ textOverflow: 'ellipsis' }}>
                    {blockData.mrkl_root}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Version
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Bits
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {formatNumber(blockData.bits)}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Weight
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {formatNumber(blockData.weight)}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Size
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {formatNumber(blockData.size)}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Nonce
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    {formatNumber(blockData.nonce)}
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Transaction Volume
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Block Reward
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                  <Grid item xs={6} md={4}>
                    <Typography variant="subtitle1" gutterBottom component="div">
                      Fee Reward
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={8}>
                    -
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {/* {blockData.tx && blockData.tx.length ? (
              <Card sx={{ marginTop: 1 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom component="div">
                    Block Transaction
                  </Typography>
                  <Pagination count={10} color="primary" />
                </CardContent>
              </Card>
            ) : (
              ''
            )} */}
            {blockTransactions()}
          </>
        ) : (
          ''
        )}
      </div>
      {loading ? (
        <div className="loading-mask">
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Searcher;
