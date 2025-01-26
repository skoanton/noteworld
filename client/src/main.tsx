import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import IndexPage from './routes/Index.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import DashboardLayout from './layout/DashboardLayout.tsx';
import AdminRoute from './routes/AdminRoute.tsx';
import AdminPage from './routes/dashboard/admin/Admin.tsx';
import DashboardPage from './routes/dashboard/Dashboard.tsx';
import CreatePasswordPage from './routes/CreatePassword.tsx';
import EditNotePage from './routes/dashboard/EditNote.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/create-password" element={<ProtectedRoute><CreatePasswordPage /></ProtectedRoute>} />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="dashboard/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
          <Route path="dashboard/note/:id/edit" element={<ProtectedRoute><EditNotePage /></ProtectedRoute>} />
        </Route>
      </Routes>


    </BrowserRouter>
  </StrictMode >,
)
