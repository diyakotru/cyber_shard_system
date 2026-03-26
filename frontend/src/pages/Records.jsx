import { useNavigate } from "react-router-dom"
import { useRecords } from "../context/RecordsContext"
import StatusBadge from "../components/StatusBadge"
import * as api from "../services/api"

export default function Records() {
    const { documents } = useRecords()
    const navigate = useNavigate()

    const activeCount = documents.filter(d => d.status === "active").length
    const compromisedCount = documents.filter(d => d.status === "compromised").length
    const recoveryCount = documents.filter(d => d.status === "recovery").length

    return (
        <div className="p-8">
            {/* Header */}
            {/* <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Records Dashboard</h2>
                <p className="text-slate-600">Municipal document registry — {documents.length} records on file</p>
            </div> */}
            <div className="flex justify-between items-center mb-8">
  
<div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900">Records Dashboard</h2>
                <p className="text-slate-600">Municipal document registry — {documents.length} records on file</p>
            </div>
  <button
    onClick={async () => {
      const doc = {
        id: "doc" + Math.floor(Math.random() * 1000),
        name: "Demo Document",
        department: "IT"
      }

                        await api.seedDocuments([doc])
                        await api.uploadDocument(doc.id, "This is demo content for judges.")

                        window.location.reload()
                    }}
                    className="primary-btn"
                >
                    + Add Demo Document
                </button>
            </div>

            {/* Stats */}
            <div className="mb-8 grid gap-4 md:grid-cols-3">
                <StatCard title="Active Records" value={activeCount} color="text-green-600" />
                <StatCard title="Integrity Alerts" value={compromisedCount} color="text-red-600" />
                <StatCard title="Under Recovery" value={recoveryCount} color="text-yellow-600" />
            </div>

            {/* Table */}
            <div className="section-card overflow-hidden">
                <div className="border-b border-slate-200 bg-slate-50 px-6 py-4">
                    <h2 className="font-semibold text-slate-900">Official Documents</h2>
                </div>

                <div className="overflow-x-auto">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Document Name</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Last Modified</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {documents.map(doc => (
                            <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-6 py-3 font-medium text-slate-900 flex items-center gap-2">
                                    <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 8V6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2v-2" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 12h6" /></svg>
                                    {doc.name}
                                </td>

                                <td className="text-slate-600">
                                    {doc.department}
                                </td>

                                <td>
                                    <StatusBadge status={doc.status} />
                                </td>

                                <td className="text-slate-600">
                                    {doc.lastModified}
                                </td>

                                <td className="whitespace-nowrap">
                                    <button
                                        onClick={() => navigate(`/document/${doc.id}`)}
                                        className="secondary-btn mr-2 !px-3 !py-1.5 !text-xs"
                                    >
                                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Open
                                    </button>
                                    <button
                                        onClick={async () => {
                                            await api.deleteDocument(doc.id)
                                            window.location.reload()
                                        }}
                                        className="danger-btn !px-3 !py-1.5 !text-xs"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

function StatCard({ title, value, color }) {
    return (
        <div className="section-card p-6">
            <div className={`text-3xl font-semibold ${color} mb-1`}>
                {value}
            </div>
            <div className="text-sm text-slate-500">
                {title}
            </div>
        </div>
    )
}