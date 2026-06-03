import { ChangeDetectionStrategy, Component, computed, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl,ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { delay, interval, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

// Exercice: Générer les contrôles à partir de ce JSON
const config = [
  { name: 'username', validators: [Validators.required], type: 'string' },
  { name: 'age', validators: [Validators.required, Validators.min(18)], type: 'number' },
  { name: 'adresse', validators: [Validators.required, Validators.minLength(20)], type: 'string' },
];

@Component({
  selector: 'app-forms',
  imports: [
    TitleCasePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Forms implements OnInit {
    readonly #fb = inject(FormBuilder);

    protected readonly form  = this.#fb.nonNullable.group({});

    // From: { [key: string]: FormControl }
    // To: { key: string, value: FormControl }[]
    protected readonly formControls = computed<{ key: string, value: FormControl }[]>(() => Object.entries<FormControl>(this.form.controls)
      .map(([key, value]) => ({ key, value })));

    // protected readonly form2  = this.#fb.nonNullable.group({
    //   email: this.#fb.nonNullable.control({ value: '', disabled: true }, [Validators.required]),
    //   test: new FormControl({ value: '', disabled: true }, [Validators.required]),
    // });

  protected mySignal = toSignal(interval(1000), { initialValue: 0 });

  protected toto: string = 'valeur initiale';


  readonly #cdRef = inject(ChangeDetectorRef);

    ngOnInit(): void {
      config.forEach((ctrl) => {
        this.form.addControl(ctrl.name, this.#fb.control(null, ctrl.validators));
      });


      // code asynchrone
      of(true).pipe(delay(1000)).subscribe({
        next: () => {
          this.toto = 'nouvelle valeur'
          this.#cdRef.markForCheck();
        },
      })
    }

  protected onSubmit(value: unknown): void {
    console.log('on submit:', value);
  }
}
