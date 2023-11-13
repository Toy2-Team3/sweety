import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { CommonData } from '../../pages/CommunityListPage';

interface DeleteModalProps {
  item: CommonData;
  handleDelete:(id:string) => void;
}

export default function AlertDialogModal({item, handleDelete}:DeleteModalProps) {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <React.Fragment>
      <Button
        variant="plain"
        color="danger"
        size='lg'
        sx={{ width: 1/2 }}
        onClick={() => setOpen(true)}
      >
        삭제
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            삭제하시겠습니까?
          </DialogTitle>
          <Divider />
          <DialogContent>
            삭제 후에는 복구가 어렵습니다!
            <br/>
            신중하게 결정해주세요 🧐
          </DialogContent>
          <DialogActions>
            <Button variant="solid" color="danger" onClick={() => handleDelete(item.id)}>
              삭제
            </Button>
            <Button variant="plain" color="neutral" onClick={() => setOpen(false)}>
              취소
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}