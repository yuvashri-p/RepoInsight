
import { useNavigate } from 'react-router-dom'
import RiskBadge from './RiskBadge'

export default function FileTable({ files }) {
  const navigate = useNavigate()

  return (
    <div className="overflow-x-auto rounded-xl border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-4">File Path</th>
            <th className="p-4">Risk Score</th>
            <th className="p-4">Risk Level</th>
          </tr>
        </thead>

        <tbody>
          {files.map(file => (
            <tr
              key={file.path}
              onClick={() =>
                navigate(`/file?path=${encodeURIComponent(file.path)}`)
              }
              className="cursor-pointer border-t hover:bg-blue-50"
            >
              <td className="p-4 font-medium text-blue-700">
                {file.path}
              </td>
              <td className="p-4">{file.riskScore}/100</td>
              <td className="p-4">
                <RiskBadge level={file.riskLevel} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {files.length === 0 && (
        <p className="p-6 text-center text-gray-500">
          No files match this filter.
        </p>
      )}
    </div>
  )
}
