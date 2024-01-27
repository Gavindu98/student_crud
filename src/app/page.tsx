import Header from './components/header';
import StudentList from './components/studentList';

export default function Home() {
  return (
    <main className="min-h-screen bg-blue-100">
      <Header />
      <div className='p-4 lg:p-24'>
        <StudentList />
      </div>
    </main>
  )
}
