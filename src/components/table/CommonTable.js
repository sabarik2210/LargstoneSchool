import * as React from 'react';
import Box from '@mui/material/Box';
import {
    DataGrid,
    GridToolbarQuickFilter,
    GridLogicOperator,
} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { Button } from '@mui/material/node';
import { Link, useLocation } from 'react-router-dom';
import AppBreadcrumbs from '../../pages/Breadcrumbs';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { color } from '@mui/system';
import Typography from '@mui/material/node/Typography';





export default function CommonTable(props) {
    // console.log(props.rows[0])

    const [apiData] = React.useState(props['rows'])
    // console.log(apiData)

    const [page, setPage] = React.useState(1)
    let row = 5;
    const count = Math.ceil(props['rows'].length / row);
    // console.log("count", count);
    row = row * page
    const list = props['rows'].slice((page - 1) * 5, row);
    // console.log(list);
    const handleChange = (event, value) => {
        setPage(value);

    }

    const { data } = useDemoData({
        dataSet: 'Employee',
        // visibleFields: `${props.header}`,
        rowLength: 100,
    });

    // Otherwise filter will be applied on fields such as the hidden column id
    // const columns = React.useMemo(
    //     () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
    //     [data.columns],
    // );
    function QuickSearchToolbar() {
        return (

            <Box
                sx={{
                    p: 1,
                    pb: 0,
                    display: 'flex',
                    justifyContent: 'space-between'
                }}
            >
                <Typography sx={{ mt: 4, color: '#455560', fontSize: '24px', fontWeight: '500' }}>{props.typo}</Typography>
                <div style={{ display: 'flex', flexDirection: 'column', paddingTop: '20px' }}>

                    <Link to={props.path}>
                        <Button sx={{ background: '#349eff', textTransform: 'none', color: '#fff', float: 'right', ":hover": { background: '#349eff' } }}>{props.button}</Button>
                    </Link>

                    <GridToolbarQuickFilter sx={{ float: 'right', py: 3, '& .MuiInput-input:focus': { border: 'none' } }}
                        quickFilterParser={(searchInput) =>
                            searchInput
                                .split(',')
                                .map((value) => value.trim())
                                .filter((value) => value !== '')
                        }
                    />
                </div>
            </Box>

        );
    }

    return (
        <>
            <AppBreadcrumbs />


            <Box sx={{

                my: 4, width: '100%', '& .super-app-theme--header': {
                    color: '#455560', fontSize: '16px'
                },
            }}>

                <DataGrid
                    sx={{
                        px: 3,
                        border: "none", ".MuiDataGrid-cell": { overflow: 'visible', fontfamily: 'sans-serif', fontSize: '16px', maxWidth: 0, justifyContent: 'start', border: "none" },
                        "& .MuiDataGrid-columnHeaders": { borderBottom: "none" },
                        "& .super-app-theme--header": { backgroundColor: "#fafafb" },
                        ".&  .MuiDataGrid-iconButtonContainer css-ltf0zy-MuiDataGrid-iconButtonContainer ": { visibility: "hidden" },
                        '.MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },

                        '&.MuiDataGrid-root': {
                            border: 'none',
                            background: '#fff',
                            borderRadius: '10px',
                            boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
                        }, '.MuiDataGrid-iconButtonContainer': {
                            visibility: 'hidden',
                        },
                        '.MuiDataGrid-sortIcon': {
                            opacity: 0,
                            visibility: 'hidden',
                        },
                        '.MuiDataGrid-row': {
                            ":hover": { background: '#349eff', color: '#fff' }
                        }

                    }}

                    disableColumnFilter
                    disableColumnSelector
                    disableRowSelectionOnClick
                    disableColumnMenu
                    disableVirtualization
                    disableDensitySelector
                    // {...data}
                    hideFooterPagination
                    rows={list}
                    autoHeight
                    getRowId={(row) => row[props.id]}
                    columns={props?.header}
                    initialState={{
                        ...data?.initialState,
                        filter: {
                            ...data?.initialState?.filter,
                            filterModel: {
                                items: [],
                                quickFilterLogicOperator: GridLogicOperator.Or,
                            },
                        },
                    }}


                    slots={{ toolbar: QuickSearchToolbar, }}

                />
                <div>
                    <Stack spacing={2} sx={{ float: 'right', position: 'relative', bottom: '42px' }}>
                        <Pagination sx={{
                            '& .MuiSvgIcon-root': { display: 'none' },
                            '& .MuiPaginationItem-root.Mui-selected ': { background: '#349eff' },
                            '& .MuiButtonBase-root': { ":hover": { background: '#349eff', color: '#fff' } }
                        }}
                            className="pagi" count={count} page={page}
                            onChange={handleChange}
                            color='primary' />
                    </Stack>
                </div>

            </Box>

        </>
    );
}
