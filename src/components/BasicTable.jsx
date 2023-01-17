import { useTable } from 'react-table'
import Table from 'react-bootstrap/Table'


const BasicTable = ({ columns, data }) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		rows,
		footerGroups,
		prepareRow,
	} = useTable({ columns, data })

	return (
		<Table hover {...getTableProps()}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>

			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => (
								<td className="align-middle" {...cell.getCellProps()}>
									{cell.render('Cell')}
								</td>
							))}
						</tr>
					)
				})}
			</tbody>
			<tfoot>
        {footerGroups.map(group => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map(column => (
              <td {...column.getFooterProps()}>{column.render('Footer')}</td>
            ))}
          </tr>
        ))}
      </tfoot>
		</Table>
	)
}

export default BasicTable
