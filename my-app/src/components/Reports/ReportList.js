import React from 'react'

function ReportList(props) {

    return (
        <>
            <h1>Reports</h1>
            <h4>Generate Report</h4>
            <div className='report-date-picker' >
                <div className='col'>
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                        className='form-control'
                        id='startDate'
                        name='startDate'
                        placeholder='Date'
                        type='date'
                        style={{width: '250px'}}
                        //value={startDate}
                        //onChange={this.handleChange}
                    />
                </div>
                <br/>
                <div className='col'>
                    <label htmlFor="endDate">End Date:</label>
                    <input
                        className='form-control'
                        id='endDate'
                        name='endDate'
                        placeholder='Date'
                        type='date'
                        style={{width: '250px'}}
                        //value={endDate}
                        //onChange={this.handleChange}
                    />
                </div>
            </div>
            <div>

            </div>
            <button>Generate Report</button>
        </>
    )
}

export default ReportList