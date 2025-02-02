import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HashRouter, Route, Routes } from "react-router";
import IndexPage from './routes/Index.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';
import DashboardLayout from './layout/DashboardLayout.tsx';
import AdminRoute from './routes/AdminRoute.tsx';
import AdminPage from './routes/dashboard/admin/Admin.tsx';
import DashboardPage from './routes/dashboard/Dashboard.tsx';
import CreatePasswordPage from './routes/CreatePassword.tsx';
import EditNotePage from './routes/dashboard/EditNote.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import GuestRoute from './routes/GuestRoute.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<GuestRoute><IndexPage /></GuestRoute>} />
          <Route path="/create-password" element={<ProtectedRoute><CreatePasswordPage /></ProtectedRoute>} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
            <Route path="note/:id/edit" element={<ProtectedRoute><EditNotePage /></ProtectedRoute>} />
          </Route>
        </Routes>
      </HashRouter>
    </ThemeProvider>
  </StrictMode >,
)
