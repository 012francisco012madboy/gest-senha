import { Initials } from '@/components/initials';
import AddFileModal from '@/components/modal/add-file-modal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { AuthContext } from '@/context/auth-context';
import { GlobalContext } from '@/context/global-context';
import { Upload, LogOut, LayoutGrid, FolderOpen } from 'lucide-react';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Fragment } from 'react/jsx-runtime';

const Nav = () => {
    const { breakCompany } = useContext(GlobalContext)
    const { user, logOut } = useContext(AuthContext)

    const navigate = useNavigate()

    const [openAddFile, setOpenAddFile] = useState(false)

    return (
        <Fragment>
            <AddFileModal open={openAddFile} setOpen={setOpenAddFile} />
            <nav className="w-full h-20 flex items-center justify-between gap-2 px-4! sticky top-0 z-30 border-b border-input bg-white">
                <Link to="/">
                    <div className="flex items-center gap-2">
                        <FolderOpen className="text-orange-600 size-10 sm:size-11" size={40}/>
                        <h1 className="text-sm sm:text-lg font-bold leading-4 sm:leading-6 uppercase text-orange-600">{breakCompany()}</h1>
                    </div>
                </Link>
                {
                    !user ?
                        <Button type='button' variant="brand" className='px-4!' onClick={() => navigate("/sign-in")}>Fazer login</Button> :
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Fragment>
                                <Button type='button' variant="secondary" className='w-9 sm:w-auto sm:px-4!' onClick={() => setOpenAddFile(true)}>
                                    <Upload className='text-lg' /> <span className="hidden sm:inline">Upload</span>
                                </Button>
                                <Separator orientation='vertical' />
                            </Fragment>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="bg-transparent! border-none! p-0! w-fit! h-fit!">
                                    <Avatar size='lg'>
                                        <AvatarFallback className="font-bold">{Initials(user?.name)}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    {
                                        user?.role == "1" &&
                                        <Fragment>
                                            <DropdownMenuItem onClick={() => navigate("/admin/users")}>
                                                <LayoutGrid className="text-lg" />
                                                Dashboard
                                            </DropdownMenuItem>
                                            <Separator />
                                        </Fragment>
                                    }
                                    <DropdownMenuItem variant='destructive' onClick={logOut}>
                                        <LogOut className="text-lg" />
                                        Sair
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                }
            </nav>
        </Fragment>
    );
}

export default Nav;